// Kotlin implementation
class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        webView = findViewById(R.id.webview)
        
        // Enable JavaScript and other WebView settings
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            loadWithOverviewMode = true
            useWideViewPort = true
        }
        
        // Load your web app
        webView.loadUrl("https://your-webapp-domain.com")
        
        // Set WebViewClient to handle navigation within WebView
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                url?.let { view?.loadUrl(it) }
                return true
            }
        }
    }
    
    override fun onBackPressed() {
        when {
            webView.canGoBack() -> {
                webView.goBack() // Navigate back in web history
            }
            else -> {
                showExitConfirmationDialog()
            }
        }
    }
    
    private fun showExitConfirmationDialog() {
        AlertDialog.Builder(this)
            .setTitle("Exit App")
            .setMessage("Are you sure you want to exit JSG Sparsh Portal?")
            .setPositiveButton("Yes") { _, _ ->
                super.onBackPressed() // Close the app
            }
            .setNegativeButton("No") { dialog, _ ->
                dialog.dismiss() // Stay in the app
            }
            .show()
    }
}