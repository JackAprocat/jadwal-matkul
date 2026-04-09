package com.polban.jadwalmatkul

import android.os.Bundle
import android.view.GestureDetector
import android.view.MotionEvent
import android.view.View
import android.view.animation.AnimationUtils
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import kotlin.math.abs

class JadwalActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var progressBar: ProgressBar
    private lateinit var tvKosong: TextView
    private lateinit var tvJudulHari: TextView
    private lateinit var tvModeRingkas: TextView
    private lateinit var layoutHari: LinearLayout
    private lateinit var kelas: String
    private lateinit var gestureDetector: GestureDetector

    private val hariList = listOf("SENIN", "SELASA", "RABU", "KAMIS", "JUMAT")
    private var indexHari = 0
    private var isCompact = false
    private var pendingSlideFromRight = true  // direction for current load animation

    // Cache the loaded data so compact toggle doesn't need to re-fetch
    private var currentData: List<JadwalItem> = emptyList()

    private val api: JadwalApi by lazy {
        retrofit.create(JadwalApi::class.java)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_jadwal)

        kelas = intent.getStringExtra("KELAS") ?: "1AKA"

        recyclerView = findViewById(R.id.recyclerView)
        progressBar = findViewById(R.id.progressBar)
        tvKosong = findViewById(R.id.tvKosong)
        tvJudulHari = findViewById(R.id.tvJudulHari)
        tvModeRingkas = findViewById(R.id.tvModeRingkas)
        layoutHari = findViewById(R.id.layoutHari)

        findViewById<ImageButton>(R.id.btnBack).setOnClickListener { finish() }
        findViewById<TextView>(R.id.tvKelas).text = "Jadwal $kelas"

        recyclerView.layoutManager = LinearLayoutManager(this)

        // Compact toggle via header button
        findViewById<ImageButton>(R.id.btnToggleCompact).setOnClickListener {
            toggleCompactMode()
        }

        // Compact toggle via text label
        tvModeRingkas.setOnClickListener {
            toggleCompactMode()
        }

        // FAB: Refresh
        findViewById<ImageButton>(R.id.fabRefresh).setOnClickListener {
            loadJadwal()
        }

        // FAB: Compact toggle
        findViewById<ImageButton>(R.id.fabCompact).setOnClickListener {
            toggleCompactMode()
        }

        // Swipe gesture
        gestureDetector = GestureDetector(this, object : GestureDetector.SimpleOnGestureListener() {
            override fun onFling(
                e1: MotionEvent?,
                e2: MotionEvent,
                velocityX: Float,
                velocityY: Float
            ): Boolean {
                val diffX = (e2.x - (e1?.x ?: 0f))
                if (abs(diffX) > 100 && abs(velocityX) > 100) {
                    if (diffX < 0 && indexHari < hariList.size - 1) {
                        indexHari++
                        buatTombolHari()
                        loadJadwalWithAnimation(fromRight = true)  // swipe left → next day comes from right
                    } else if (diffX > 0 && indexHari > 0) {
                        indexHari--
                        buatTombolHari()
                        loadJadwalWithAnimation(fromRight = false) // swipe right → prev day comes from left
                    }
                    return true
                }
                return false
            }
        })

        recyclerView.setOnTouchListener { _, event ->
            gestureDetector.onTouchEvent(event)
            false
        }

        buatTombolHari()
        loadJadwal()
    }

    // FIX: use currentData directly — safe and simple
    private fun toggleCompactMode() {
        isCompact = !isCompact
        tvModeRingkas.text = if (isCompact) "Mode Tampilan Lengkap" else "Mode Tampilan Ringkas"
        if (currentData.isNotEmpty()) {
            recyclerView.adapter = JadwalAdapter(currentData, isCompact)
        }
    }

    private fun buatTombolHari() {
        layoutHari.removeAllViews()
        for ((index, hari) in hariList.withIndex()) {
            val btn = Button(this)
            btn.text = hari
            btn.textSize = 11f
            btn.setPadding(28, 14, 28, 14)
            btn.isAllCaps = true

            val params = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            )
            params.setMargins(6, 6, 6, 6)
            btn.layoutParams = params

            val aktif = index == indexHari
            if (aktif) {
                btn.background = resources.getDrawable(R.drawable.bg_day_active, theme)
                btn.setTextColor(0xFF000000.toInt())
            } else {
                btn.background = resources.getDrawable(R.drawable.bg_day_inactive, theme)
                btn.setTextColor(0xFFCCCCCC.toInt())
            }

            btn.setOnClickListener {
                val goingRight = index > indexHari  // capture direction before changing
                indexHari = index
                buatTombolHari()
                loadJadwalWithAnimation(fromRight = goingRight)
            }

            layoutHari.addView(btn)
        }

        tvJudulHari.text = "Jadwal ${hariList[indexHari]}"
    }

    // FIX: safe waktu parsing — handles any format, never crashes
    private fun parseWaktuAwal(waktu: String): String {
        return if (waktu.contains(" - ")) waktu.split(" - ")[0]
               else if (waktu.contains("-")) waktu.split("-")[0].trim()
               else waktu
    }

    private fun parseWaktuAkhir(waktu: String): String {
        return if (waktu.contains(" - ")) waktu.split(" - ").getOrElse(1) { waktu }
               else if (waktu.contains("-")) waktu.split("-").getOrElse(1) { waktu }.trim()
               else waktu
    }

    private fun gabungkanJadwal(data: List<JadwalItem>): List<JadwalItem> {
        if (data.isEmpty()) return emptyList()
        val hasil = mutableListOf<JadwalItem>()
        var i = 0
        while (i < data.size) {
            val current = data[i]
            var j = i + 1
            // Merge consecutive items with same matkul and dosen
            while (j < data.size &&
                data[j].matkul == current.matkul &&
                data[j].dosen == current.dosen
            ) {
                j++
            }
            // Safely parse waktu start and end
            val waktuAwal = parseWaktuAwal(current.waktu)
            val waktuAkhir = parseWaktuAkhir(data[j - 1].waktu)
            hasil.add(
                JadwalItem(
                    jam = current.jam,
                    waktu = "$waktuAwal - $waktuAkhir",
                    matkul = current.matkul,
                    dosen = current.dosen,
                    ruang = current.ruang
                )
            )
            i = j
        }
        return hasil
    }

    private fun loadJadwalWithAnimation(fromRight: Boolean = true) {
        pendingSlideFromRight = fromRight
        // Slide out the current content in the opposite direction
        val slideOutAnim = if (fromRight) R.anim.slide_out_left else R.anim.slide_out_right
        val anim = AnimationUtils.loadAnimation(this, slideOutAnim)
        recyclerView.startAnimation(anim)
        recyclerView.postDelayed({ loadJadwal() }, 220)
    }

    private fun loadJadwal() {
        val hari = hariList[indexHari]

        progressBar.visibility = View.VISIBLE
        recyclerView.visibility = View.GONE
        tvKosong.visibility = View.GONE

        api.getJadwal(kelas, hari).enqueue(object : Callback<List<JadwalItem>> {
            override fun onResponse(
                call: Call<List<JadwalItem>>,
                response: Response<List<JadwalItem>>
            ) {
                try {
                    progressBar.visibility = View.GONE
                    val data = response.body()
                    if (data.isNullOrEmpty()) {
                        tvKosong.visibility = View.VISIBLE
                    } else {
                        val dataGabung = gabungkanJadwal(data)
                        currentData = dataGabung
                        // Apply staggered bottom-to-top card entrance animation
                        val layoutAnim = AnimationUtils.loadLayoutAnimation(
                            this@JadwalActivity, R.anim.layout_slide_up
                        )
                        recyclerView.layoutAnimation = layoutAnim
                        recyclerView.adapter = JadwalAdapter(dataGabung, isCompact)
                        recyclerView.visibility = View.VISIBLE
                        recyclerView.scheduleLayoutAnimation()
                    }
                } catch (e: Exception) {
                    // Catch any unexpected runtime error so it isn't silently swallowed
                    progressBar.visibility = View.GONE
                    Toast.makeText(
                        this@JadwalActivity,
                        "Error: ${e.message}",
                        Toast.LENGTH_LONG
                    ).show()
                }
            }

            override fun onFailure(call: Call<List<JadwalItem>>, t: Throwable) {
                progressBar.visibility = View.GONE
                Toast.makeText(
                    this@JadwalActivity,
                    "Gagal: ${t.message}",
                    Toast.LENGTH_LONG
                ).show()
            }
        })
    }

    override fun finish() {
        super.finish()
        overridePendingTransition(R.anim.slide_in_left, R.anim.slide_out_right)
    }
}