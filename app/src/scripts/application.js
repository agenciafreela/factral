(function () {

    'use strict';

    angular
        .module('FractalApp', [
            'ngRoute',
            'ngMaterial',
            'ngAnimate',
            'ui.bootstrap.carousel',
            'ngSanitize'
        ])

        .factory('scroll', ['$anchorScroll', '$location', function ($anchorScroll, $location) {
            this.to = function (hash) {
                if ($location.hash() !== hash) {
                    $location.hash(hash);
                } else {
                    $anchorScroll();
                }
            };
        }])

        .controller('MainController', function ($scope, $route, $routeParams, $location) {
            $scope.$route = $route;
            $scope.$location = $location;
            $scope.$routeParams = $routeParams;
        })

        .controller('contatoController', function ($scope, $http) {
            //Funcao para inicializar o mapa com um marcador no colegio
            initialize(new google.maps.LatLng(-23.6345329, -46.7133006));

        })

        .controller('MenuCtrl', ['$anchorScroll', '$location', '$scope', '$mdSidenav', function ($anchorScroll, $location, $scope, $mdSidenav) {

            $scope.toggleMenu = function () {
                $mdSidenav('menu-mobile').toggle();
            };

        }])

        .controller('MenuCtrlMobile', ['$anchorScroll', '$location', '$scope', '$mdSidenav', function ($anchorScroll, $location, $scope, $mdSidenav) {

            $scope.closeMenu = function () {
                $mdSidenav('menu-mobile').close();
            };

        }])

        .controller('CarouselCoursesCtrl', ['$scope', function ($scope) {
            $scope.myInterval = 3000;
            $scope.slides = [
                {
                    image: 'http://lorempixel.com/800/400',
                    caption: ''
                },
                {
                    image: 'http://lorempixel.com/800/400',
                    caption: ''
                },
                {
                    image: 'http://lorempixel.com/800/400',
                    caption: ''
                }
            ];
        }])

        .controller('CarouselHomeCtrl', function ($scope) {
            var self = this;

            $scope.myInterval = 3000;

            self.banners = [
                {
                    image: '1.jpg',
                    caption: ''
                },
                {
                    image: '2.jpg',
                    caption: ''
                }
            ];

        })

        .controller('CarouselDemoCtrl', ['$scope', function ($scope) {
            $scope.myInterval = 3000;
            $scope.slides = [
                {
                    image: 'http://lorempixel.com/820/400',
                    caption: ''
                },
                {
                    image: 'http://lorempixel.com/820/400',
                    caption: ''
                },
                {
                    image: 'http://lorempixel.com/820/400',
                    caption: ''
                }
            ];
        }])

        .config(['$routeProvider', function ($routeProvider, $httpProvider) {
            //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $routeProvider
                .when('/', {templateUrl: 'views/home.html'})
                .when('/alunos', {templateUrl: 'views/alunos.html'})
                .when('/professores', {templateUrl: 'views/professores.html'})
                .when('/professores/1', {templateUrl: 'views/oficina-1.html'})
                .when('/professores/2', {templateUrl: 'views/oficina-2.html'})
                .when('/alunos/1', {templateUrl: 'views/oficina-3.html'})
                .when('/alunos/2', {templateUrl: 'views/oficina-4.html'})
                .when('/alunos/3', {templateUrl: 'views/oficina-5.html'})
                .when('/contato', {templateUrl: 'views/contato.html'})
                .otherwise({
                    redirectTo: '/'
                });
        }]);
    // .run(function($rootScope){
    //     $rootScope.$on('$routeChangeSuccess', function (event, currentRoute) {
    //       $rootScope.bodyClass = (currentRoute.originalPath.match(/colabore/g)) ? "donate" : "";
    //     });
    // });


    if (!Array.prototype.last) {
        Array.prototype.last = function () {
            return this[this.length - 1];
        };
    }

})();
