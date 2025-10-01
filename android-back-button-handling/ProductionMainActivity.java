// Production-ready Android implementation - NO WEB CHANGES NEEDED
public class MainActivity extends AppCompatActivity {
    private WebView webView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        webView = findViewById(R.id.webview);
        
        // Configure WebView settings
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);
        webSettings.setBuiltInZoomControls(false);
        webSettings.setDisplayZoomControls(false);
        
        // Load your production web app
        webView.loadUrl("https://your-production-domain.com");
        
        // Handle navigation within WebView
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
            
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                // Optional: Show loading indicator
            }
            
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                // Optional: Hide loading indicator
            }
        });
        
        // Handle file uploads (for photo uploads in registration)
        webView.setWebChromeClient(new WebChromeClient() {
            // Handle file upload for registration photos
            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, 
                    FileChooserParams fileChooserParams) {
                // Implementation for file uploads
                return super.onShowFileChooser(webView, filePathCallback, fileChooserParams);
            }
        });
    }
    
    @Override
    public void onBackPressed() {
        // Handle back navigation
        if (webView.canGoBack()) {
            // Navigate back in web history
            webView.goBack();
        } else {
            // Show exit confirmation - no web app changes needed!
            showExitDialog();
        }
    }
    
    private void showExitDialog() {
        new AlertDialog.Builder(this)
            .setTitle("Exit JSG Sparsh Portal")
            .setMessage("Are you sure you want to exit?")
            .setIcon(R.drawable.ic_launcher) // Your app icon
            .setPositiveButton("Exit", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    // Close the app
                    finish();
                }
            })
            .setNegativeButton("Stay", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    // Dismiss dialog, stay in app
                    dialog.dismiss();
                }
            })
            .setCancelable(false) // Prevent dismissing by tapping outside
            .show();
    }
    
    @Override
    protected void onPause() {
        super.onPause();
        if (webView != null) {
            webView.onPause();
        }
    }
    
    @Override
    protected void onResume() {
        super.onResume();
        if (webView != null) {
            webView.onResume();
        }
    }
    
    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.destroy();
        }
        super.onDestroy();
    }
}