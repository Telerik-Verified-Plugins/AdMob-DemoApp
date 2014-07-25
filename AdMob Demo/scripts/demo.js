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
            // go to www.admob.com, sign up, create your app (one for each platform) and change the keys below
			var admob_ios_key = 'ca-app-pub-9517346003011652/4450962523';
            var admob_android_key = 'ca-app-pub-9517346003011652/8741561327';
            // var admob_wp8_key = 'ca-app-pub-9517346003011652/2695027726'; // future work
            
            var adMobKey = (navigator.userAgent.indexOf('Android') >=0) ? admob_android_key : admob_ios_key;

            window.plugins.AdMob.createBannerView(
                // createBannerView params
                {
                    'publisherId': adMobKey,
                    'adSize': bannerType,
                    'bannerAtTop': bannerPosition == 'top'
        		},
                // createBannerView success callback
                function() {
                  window.plugins.AdMob.requestAd(
                      // requestAd params
                      {'isTesting':false},
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

            // go to www.admob.com, sign up, create your app (one for each platform) and change the keys below
			var admob_ios_key = 'ca-app-pub-9517346003011652/4450962523';
            var admob_android_key = 'ca-app-pub-9517346003011652/8741561327';
            // var admob_wp8_key = 'ca-app-pub-9517346003011652/2695027726'; // future work
            
            var adMobKey = (navigator.userAgent.indexOf('Android') >=0) ? admob_android_key : admob_ios_key;

            window.plugins.AdMob.createInterstitialView(
                // createInterstitialView params
                {
                    'publisherId': adMobKey
        		},
                // createInterstitialView success callback
                function() {
                  window.plugins.AdMob.requestInterstitialAd (
                      // requestInterstitialAd  params
                      {'isTesting':false},
                      // requestInterstitialAd  success callback
                      function(){
                          /*
                        window.plugins.AdMob.showAd(
                            // showAd params
                            true,
                            // showAd success callback
                            function() {console.log('show ok')},
                            // showAd error callback
                            function() { alert('failed to show ad')});
                            */
                      },
                      // requestInterstitialAd  error callback
                      function(){ alert('failed to request ad'); }
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