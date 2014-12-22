// go to www.admob.com, sign up, create your app (one for each platform) and change the keys below
var ad_units = {
  ios : {
    banner: 'ca-app-pub-9517346003011652/4450962523',
    interstitial: 'ca-app-pub-9517346003011652/9770622520'
  },
  android : {
    banner: 'ca-app-pub-9517346003011652/8741561327',
    interstitial: 'ca-app-pub-9517346003011652/2247355722'
  },
  wp8 : {
    banner: 'ca-app-pub-9517346003011652/2695027726',
    interstitial: 'ca-app-pub-9517346003011652/3724088920'
  }
};

var adMobKeys;
if (/(android)/i.test(navigator.userAgent)) {
  adMobKeys = ad_units.android;
} else if (/(iphone|ipad)/i.test(navigator.userAgent)) {
  adMobKeys = ad_units.ios;
} else {
  adMobKeys = ad_units.wp8;
}

(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        showBannerTop: function () {
            if (!this.checkSimulator()) {
	            this.showBanner('top', window.plugins.AdMob.AD_SIZE.BANNER);
            }
        },

        showBannerBottom: function () {
            if (!this.checkSimulator()) {
	            this.showBanner('bottom', window.plugins.AdMob.AD_SIZE.BANNER);
            }
        },

        showRectangleTop: function () {
            if (!this.checkSimulator()) {
	            this.showBanner('top', window.plugins.AdMob.AD_SIZE.IAB_MRECT);
            }
        },

        showBanner: function (bannerPosition, bannerType) {
            window.plugins.AdMob.createBannerView(
                // createBannerView params
                {
                  'publisherId': adMobKeys.banner,
                  'adSize': bannerType,
                  'bannerAtTop': bannerPosition == 'top',
                  'overlap': false, // true doesn't push the webcontent away
                  'offsetTopBar': true // set to true if you want it below the iOS >= 7 statusbar
            		},
                // createBannerView success callback
                function() {
                  window.plugins.AdMob.requestAd(
                      // requestAd params
                      {
                        'isTesting': false
                      },
                      // requestAd success callback
                      function(){
                        window.plugins.AdMob.showAd(
                            // showAd params
                            true,
                            // showAd success callback
                            function() {console.log('show ok')},
                            // showAd error callback
                            function() { alert('failed to show ad')});
                      },
                      // requestAd error callback
                      function(){ alert('failed to request ad'); }
                  );
                },
                // createBannerView error callback
                function(){ alert('failed to create banner view'); }
		      );
        },

        showInterstitialView: function () {
            if (this.checkSimulator()) {
                return;
            }
            window.plugins.AdMob.createInterstitialView(
                // createInterstitialView params
                {
                  'interstitialAdId': adMobKeys.interstitial,
                  'autoShow': true // auto show interstitial ad when loaded
            		},
                // createInterstitialView success callback
                function() {
                  window.plugins.AdMob.requestInterstitialAd (
                      // requestInterstitialAd  params
                      {
                        'isTesting': false
                      },
                      // requestInterstitialAd  success callback
                      function() {
                        window.plugins.AdMob.showInterstitialAd (
                            // showAd params
                            true,
                            // showAd success callback
                            function() {console.log('show ok')},
                            // showAd error callback
                            function() { alert('failed to show ad')});
                      },
                      // requestInterstitialAd  error callback
                      function(){ console.log('failed to request ad'); }
                  );
                },
                // createInterstitialView error callback
                function(){ alert('failed to create banner view'); }
		    );
        },

        hideBanner: function () {
            if (!this.checkSimulator()) {
	            window.plugins.AdMob.destroyBannerView();
            }
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.plugins === undefined || window.plugins.AdMob === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        }        
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);