// Enhanced Android Activity with JavaScript Bridge
public class MainActivity extends AppCompatActivity {
    private WebView webView;
    private boolean exitConfirmed = false;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        webView = findViewById(R.id.webview);
        
        // Enable JavaScript and other settings
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        
        // Add JavaScript interface for communication
        webView.addJavaScriptInterface(new WebAppInterface(this), "AndroidInterface");
        
        webView.loadUrl("https://your-webapp-domain.com");
        
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                // Inject JavaScript to handle back button on web side
                injectBackButtonHandler();
            }
        });
    }
    
    private void injectBackButtonHandler() {
        String javascript = 
            "window.addEventListener('popstate', function(event) {" +
            "   if (window.AndroidInterface) {" +
            "       window.AndroidInterface.onWebBackPressed();" +
            "   }" +
            "});";
        
        webView.evaluateJavascript(javascript, null);
    }
    
    @Override
    public void onBackPressed() {
        // First, try to handle back navigation in web app
        webView.evaluateJavascript(
            "if (window.history.length > 1) { window.history.back(); } else { window.AndroidInterface.requestAppExit(); }",
            null
        );
    }
    
    public class WebAppInterface {
        Context context;
        
        WebAppInterface(Context c) {
            context = c;
        }
        
        @JavascriptInterface
        public void onWebBackPressed() {
            // Called when web app handles back navigation
            Log.d("WebApp", "Web app handled back navigation");
        }
        
        @JavascriptInterface
        public void requestAppExit() {
            // Called when web app wants to exit
            runOnUiThread(() -> showExitConfirmationDialog());
        }
        
        @JavascriptInterface
        public void showToast(String message) {
            Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
        }
    }
    
    private void showExitConfirmationDialog() {
        new AlertDialog.Builder(this)
            .setTitle("Exit JSG Sparsh Portal")
            .setMessage("Are you sure you want to exit the app?")
            .setIcon(R.drawable.ic_exit) // Add your app icon
            .setPositiveButton("Exit", (dialog, which) -> {
                finish();
                System.exit(0);
            })
            .setNegativeButton("Stay", (dialog, which) -> dialog.dismiss())
            .setCancelable(false)
            .show();
    }
}