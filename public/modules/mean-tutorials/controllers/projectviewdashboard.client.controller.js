'use strict';

angular.module('mean-tutorials').controller('ProjectviewdashboardController', ['$scope',
    '$window', '$state', '$http', '$q', '$mdDialog', '$mdSidenav', 'configGdrive',
    'Googledrive', 'GooglePlus', 'Products', 'Authentication', 'ProductByUserId','UtCalendar',
    '$timeout', '$mdBottomSheet', //Material Design
    'MeanEvents',
    function ($scope,
              $window, $state, $http, $q, $mdDialog, $mdSidenav, configGdrive,
              Googledrive, GooglePlus, Products, Authentication, ProductByUserId,UtCalendar,
              $timeout, $mdBottomSheet, //material Design
              MeanEvents // mean-events
             ) {
        $scope.authentication = Authentication;

        $scope.foo = 'tbody';

        // Find a list of Mean events
        $scope.findEvents = function() {
            $scope.meanEvents = MeanEvents.query();
        };

        $scope.testCreateFolder = function(){
            //console.log(accessToken);
            Googledrive.createFolder('chulwoo Fuck1', accessToken);
        };

        $scope.testGetGoogleDriveInfo = function() {
            Googledrive.getGoogleDriveInfo();
        }

        //
        var accessToken;
        $scope.permalLink = 'http://drive.google.com/uc?export=view&id=';
        $scope.arrive = false;
        $scope.authName = 'Authorize';
        $scope.isAuth = false;
        $scope.init = function init(){
            window.gapi.load('auth', $scope.authenticateWithGoogle);
            window.gapi.load('picker');
            gapi.client.load('urlshortener', 'v1');
        }
        $scope.authenticateWithGoogle =function authenticateWithGoogle(){
            window.gapi.auth.authorize({
                'client_id': configGdrive.clientId,
                'scope':configGdrive.scopes,
                'immediate': false
            }, handleAuthentication);
        }

        function handleAuthentication(result){
            if(result && !result.error){
                $scope.isAuth = true;
                $scope.authName = 'Deauthorize';
                accessToken = result.access_token;
                //console.log(accessToken);

                /*
                 callGooglePlus();
                 setFilePicker();
                 listFolder();
                 getGoogleDriveInfo();
                 createFolder();
                 */
                createNewAccountFolder();
                setFilePicker(); // singleFile
                //findTargetUriFolder();
            }else{
                console.log(result);
                console.log(result.error);
                console.log('fail to authentication')
            }
            $scope.$digest();
        }

        function listFolder() {
            Googledrive.listFolder()
        }
        /*
         function createFolder(){
         var folderName;
         Googledrive.createFolder(folderName, accessToken);
         }
         */
        function getGoogleDriveInfo(){
            Googledrive.getGoogleDriveInfo();
        }

        /// Custom file Picker Start ----------------------------------------------------------
        /*
         function setFilePicker() {
         var filePicker = document.getElementById('filePicker');

         filePicker.style.display = 'none';

         // Access token has been successfully retrieved, requests can be sent to the API.
         filePicker.style.display = 'block';
         filePicker.onchange = uploadFile;
         }

         function uploadFile(evt) {
         var callback = function(file) {
         console.log('!!File!!');
         console.log(file);
         }
         gapi.client.load('drive', 'v2', function() {
         var file = evt.target.files[0];
         insertFile(file, callback);
         });
         }

         function insertFile(fileData, callback) {
         var boundary = '-------314159265358979323846';
         var delimiter = "\r\n--" + boundary + "\r\n";
         var close_delim = "\r\n--" + boundary + "--";

         var reader = new FileReader();
         reader.readAsBinaryString(fileData);
         reader.onload = function(e) {
         var contentType = fileData.type || 'application/octet-stream';
         var metadata = {
         'title': fileData.name,
         'mimeType': contentType,
         'writersCanShare':true,
         'parents': [{
         'kind': "drive#fileLink",
         'id': "0B8FisuvAYPTfN1o1Q0d4T2JLTk0"
         }]

         };

         var base64Data = btoa(reader.result);
         var multipartRequestBody =
         delimiter +
         'Content-Type: application/json\r\n\r\n' +
         JSON.stringify(metadata) +
         delimiter +
         'Content-Type: ' + contentType + '\r\n' +
         'Content-Transfer-Encoding: base64\r\n' +
         '\r\n' +
         base64Data +
         close_delim;
         console.log(multipartRequestBody);

         var request = gapi.client.request({
         'path': '/upload/drive/v2/files',
         'method': 'POST',
         'params': {'uploadType': 'multipart'},
         'headers': {
         'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
         },
         'body': multipartRequestBody});
         if (!callback) {
         callback = function(file) {
         console.log(file)
         };
         }
         request.execute(callback);
         }
         }
         */
        /// Custom file Picker End ----------------------------------------------------------

        function callGooglePlus(){
            function callback(resp) {
                console.log(resp);
                var heading = document.createElement('h4');
                var image = document.createElement('img');
                image.src = resp.result.image.url;
                heading.appendChild(image);
                heading.appendChild(document.createTextNode(resp.result.displayName));

                document.getElementById('content').appendChild(heading);
            }
            GooglePlus.callGooglePlus(callback);
        }

        // Google PlatForm Service
        $scope.setupPicker = function() {
            function pickerCallback(data) {
                if(data.action == google.picker.Action.PICKED){
                    //do something
                    $scope.files = data.docs;
                    $scope.arrive = true;

                    // make shorten URL
                    var request = gapi.client.urlshortener.url.get({
                        'shortUrl': 'http://goo.gl/fbsS'
                    });
                    request.then(function(response) {
                        appendResults(response.result.longUrl);
                    }, function(reason) {
                        console.log('Error: ' + reason.result.error.message);
                    });

                    //alert('URL: ' + data.docs[0].url);
                    $scope.$digest()
                }else if(data.action ==google.picker.Action.CANCEL){
                    //alert('goodbye');
                }
            }
            Googledrive.setupPicker(accessToken, pickerCallback);
        }

	    $scope.listFolderInformation = function(){
		    Googledrive.listFolder();
	    }

        function createNewAccountFolder(){
            //Pre. Get User Information
            //check if there exists an
            // API /users/me (only allow to have)

            var callback = function(resp){
                console.log(resp.result.items.length);
                if(resp.result.items.length == 0){
                    $http.get('users/me')
                        .success(function(response) {
                            console.log(response);
                            var folderName = 'D2l-'+response._id;
                            //1. Create A New Folder
                            Googledrive.createFolder(folderName, accessToken);
                            //2. Update User Information
                            //$http.get()
                        });
                }
                else{
                    console.log('there is already exist')
                    $scope.rootGdriveFolderID = resp.result.items[0].id
                    $scope.$digest();
                }
            }
            Googledrive.findFolder(callback);
        }

        ////////marterial Design //////////
        $scope.alert = '';
        $scope.showListBottomSheet = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'modules/mean-tutorials/template/bottom-sheet-list-template.html',
                controller: 'BottomSheetListCtrl',
                targetEvent: $event
            }).then(function(clickedItem) {
                $scope.alert = clickedItem.name + ' clicked!';
            });
        };
        $scope.showGridBottomSheet = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'modules/mean-tutorials/template/bottom-sheet-grid-template.html',
                controller: 'BottomSheetGridCtrl',
                targetEvent: $event
            }).then(function(clickedItem) {
                $scope.alert = clickedItem.name + ' clicked!';
            });
        };
        ////////End Material Design



        //////////DATEPicker/////////////
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        ///////////END//////////////////

    }
])

	.controller('gDriveDashCtrl', function($scope, Googledrive){
		$scope.googleDrive={info:'gDriveCtrl'};

		$scope.listingFolderInfo = function(){
			$scope.gDocs = 'dd';
			console.log('gDriveDashCtrl');
			$scope.gDocs = Googledrive.listFolder();
			var request = gapi.client.drive.files.get({
				'fileId': "1Q_CJwJftcL-zabVm0USc1px5HDfbpxu6Klav-XYOzNg"
			});
			request.execute(function(resp) {
				if (!resp.error) {
					console.log('Title: ' + resp.title);
					console.log('Description: ' + resp.description);
					console.log('MIME type: ' + resp.mimeType);
					console.log(resp);
					$scope.gDocs = resp;

				} else if (resp.error.code == 401) {
					// Access token might have expired.
					checkAuth();
				} else {
					console.log('An error occured: ' + resp.error.message);
				}
			});
		}
	})

    .controller('BottomSheetListCtrl', function($scope, $mdBottomSheet) {
        $scope.items = [
            { name: 'Upload New Image (Google Drive)', icon: 'share' },
            { name: 'Select Existing Image (Google Drive)', icon: 'upload' },
            { name: 'Product History (Google Sheets)', icon: 'copy' },
            { name: 'Print this page (PDF Printer)', icon: 'print' },
        ];

        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        }
    })
    .controller('BottomSheetGridCtrl', function($scope, $mdBottomSheet) {
        $scope.items = [
            { name: 'Hangout', icon: 'hangout' },
            { name: 'Mail', icon: 'mail' },
            { name: 'Message', icon: 'message' },
            { name: 'Copy', icon: 'copy' },
        ];
        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };
    });
