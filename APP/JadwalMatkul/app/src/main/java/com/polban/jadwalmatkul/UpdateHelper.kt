package com.polban.jadwalmatkul

import android.app.Activity
import android.app.AlertDialog
import android.app.DownloadManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.widget.Toast
import androidx.core.content.FileProvider
import org.json.JSONObject
import java.io.File
import java.net.HttpURLConnection
import java.net.URL
import kotlin.concurrent.thread

object UpdateHelper {
    private const val UPDATE_JSON_URL = "https://raw.githubusercontent.com/JackAprocat/jadwal-matkul/main/version.json"

    fun checkForUpdate(activity: Activity) {
        val currentVersionCode = BuildConfig.VERSION_CODE

        thread {
            try {
                val url = URL(UPDATE_JSON_URL)
                val connection = url.openConnection() as HttpURLConnection
                connection.connectTimeout = 5000
                connection.readTimeout = 5000

                if (connection.responseCode == HttpURLConnection.HTTP_OK) {
                    val response = connection.inputStream.bufferedReader().readText()
                    val json = JSONObject(response)
                    val latestVersionCode = json.getInt("latestVersionCode")
                    val latestVersionName = json.getString("latestVersionName")
                    val downloadUrl = json.getString("downloadUrl")
                    val releaseNotes = json.optString("releaseNotes", "Pembaruan tersedia.")

                    if (latestVersionCode > currentVersionCode) {
                        activity.runOnUiThread {
                            showUpdateDialog(activity, latestVersionName, releaseNotes, downloadUrl)
                        }
                    }
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    private fun showUpdateDialog(activity: Activity, version: String, notes: String, downloadUrl: String) {
        AlertDialog.Builder(activity)
            .setTitle("Update Tersedia (v$version)")
            .setMessage("$notes\n\nApakah Anda ingin mengupdate sekarang?")
            .setCancelable(false)
            .setPositiveButton("Update") { _, _ ->
                downloadAndInstallUpdate(activity, downloadUrl)
            }
            .setNegativeButton("Nanti", null)
            .show()
    }

    private fun downloadAndInstallUpdate(context: Context, downloadUrl: String) {
        Toast.makeText(context, "Mendownload update...", Toast.LENGTH_SHORT).show()

        val fileName = "update_AK25.apk"
        val destination = File(context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), fileName)
        if (destination.exists()) destination.delete()

        val request = DownloadManager.Request(Uri.parse(downloadUrl))
            .setTitle("Update AK25")
            .setDescription("Mendownload versi terbaru...")
            .setDestinationUri(Uri.fromFile(destination))
            .setAllowedOverMetered(true)
            .setAllowedOverRoaming(true)

        val downloadManager = context.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
        val downloadId = downloadManager.enqueue(request)

        val onComplete = object : BroadcastReceiver() {
            override fun onReceive(ctxt: Context, intent: Intent) {
                val id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1)
                if (id == downloadId) {
                    try {
                        context.unregisterReceiver(this)
                    } catch (e: Exception) { }
                    installApk(context, destination)
                }
            }
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            context.registerReceiver(onComplete, IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE), Context.RECEIVER_EXPORTED)
        } else {
            context.registerReceiver(onComplete, IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE))
        }
    }

    private fun installApk(context: Context, apkFile: File) {
        val intent = Intent(Intent.ACTION_VIEW)
        val apkUri = FileProvider.getUriForFile(
            context,
            "${context.packageName}.provider",
            apkFile
        )
        intent.setDataAndType(apkUri, "application/vnd.android.package-archive")
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)

        try {
            context.startActivity(intent)
        } catch (e: Exception) {
            e.printStackTrace()
            Toast.makeText(context, "Gagal menginstal update.", Toast.LENGTH_SHORT).show()
        }
    }
}
