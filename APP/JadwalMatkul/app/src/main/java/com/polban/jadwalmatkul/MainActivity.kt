package com.polban.jadwalmatkul

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Path

// === SHARED: Model, API Interface, Retrofit ===
data class JadwalItem(
    val jam: Int,
    val waktu: String,
    val matkul: String,
    val dosen: String,
    val ruang: String
    // jenis is not returned by this API
)

interface JadwalApi {
    @GET("api/jadwal/{kelas}/{hari}")
    fun getJadwal(
        @Path("kelas") kelas: String,
        @Path("hari") hari: String
    ): Call<List<JadwalItem>>
}

val retrofit: Retrofit = Retrofit.Builder()
    .baseUrl("https://jadwal-matkul.jackaprocat.deno.net/")
    .addConverterFactory(GsonConverterFactory.create())
    .build()

// === ADAPTER Jadwal ===
class JadwalAdapter(
    private val items: List<JadwalItem>,
    private val isCompact: Boolean = false
) : RecyclerView.Adapter<JadwalAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val headerCard: View = view.findViewById(R.id.headerCard)
        val tvJenisBadge: TextView = view.findViewById(R.id.tvJenisBadge)
        val tvWaktu: TextView = view.findViewById(R.id.tvWaktu)
        val tvJam: TextView = view.findViewById(R.id.tvJam)
        val tvMatkul: TextView = view.findViewById(R.id.tvMatkul)
        val tvDosen: TextView = view.findViewById(R.id.tvDosen)
        val tvRuang: TextView = view.findViewById(R.id.tvRuang)
        val tvJenis: TextView = view.findViewById(R.id.tvJenis)
        val rowDosen: View = view.findViewById(R.id.rowDosen)
        val rowRuang: View = view.findViewById(R.id.rowRuang)
        val rowJenis: View = view.findViewById(R.id.rowJenis)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_jadwal, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = items[position]

        // Header always purple; show matkul name in the header
        holder.headerCard.setBackgroundColor(0xFF6A0DAD.toInt())
        holder.tvJenisBadge.text = item.matkul

        holder.tvWaktu.text = item.waktu
        holder.tvJam.text = "Jam ${item.jam}"
        holder.tvMatkul.visibility = View.GONE  // shown in header instead
        holder.tvDosen.text = "Dosen: ${item.dosen}"
        holder.tvRuang.text = "Ruangan: ${item.ruang}"
        holder.tvJenis.text = ""
        holder.rowJenis.visibility = View.GONE

        // Compact mode: hide detail rows
        val detailVisibility = if (isCompact) View.GONE else View.VISIBLE
        holder.rowDosen.visibility = detailVisibility
        holder.rowRuang.visibility = detailVisibility
    }

    override fun getItemCount() = items.size
}

// === ADAPTER Kelas ===
data class KelasItem(val nama: String, val ikonRes: Int)

class KelasAdapter(
    private val items: List<KelasItem>,
    private val onClick: (KelasItem) -> Unit
) : RecyclerView.Adapter<KelasAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvNama: TextView = view.findViewById(R.id.tvNamaKelas)
        val ivIcon: ImageView = view.findViewById(R.id.ivIcon)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_kelas, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = items[position]
        holder.tvNama.text = item.nama
        holder.ivIcon.setImageResource(item.ikonRes)
        holder.itemView.setOnClickListener { onClick(item) }
    }

    override fun getItemCount() = items.size
}

// === MAIN ACTIVITY ===
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val kelasList = listOf(
            KelasItem("Kelas 1AKA", R.drawable.ic_kelas_aka),   // Calculator
            KelasItem("Kelas 1AKB", R.drawable.ic_kelas_akb),   // Open Book
            KelasItem("Kelas 1AKC", R.drawable.ic_kelas_akc),   // Coin Stack
        )

        val recycler = findViewById<RecyclerView>(R.id.recyclerViewKelas)
        recycler.layoutManager = LinearLayoutManager(this)
        recycler.adapter = KelasAdapter(kelasList) { kelas ->
            val intent = Intent(this, JadwalActivity::class.java)
            intent.putExtra("KELAS", kelas.nama.replace("Kelas ", ""))
            startActivity(intent)
            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left)
        }

        // Cek update saat aplikasi dibuka
        UpdateHelper.checkForUpdate(this)
    }
}