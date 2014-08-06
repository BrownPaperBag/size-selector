+function(){

    var module = angular.module('sizeSelector', [

        // No dependencies being used...

    ]);

    module.directive('sizeSelector', function(){

        return {

            link : function($scope, $element, $attributes){

                $scope.$watch('model', function(newValue, oldValue){

                    if(newValue != oldValue){

                        $scope.$parent.$eval($attributes.onChange);

                    }

                });

                $scope.changeSize = function(increase){

                    if($scope.model == null){

                        $scope.model = 0;

                    }
                    else{

                        $scope.model = Math.max(0, Math.min($scope.sizes.length - 1, $scope.model + increase));

                    }

                };

            },

            replace : true,

            restrict : 'E',

            scope : {

                default : '=',

                large : '=',

                model : '=',
                
                sizes : '='

            },

            template : [

                '<div class="bpb-size-selector">',
                    '<div ng-show="sizes.length > 0">',
                        '<button class="bpb-size-selector-button bpb-size-selector-button-minus ng-class: {\'disabled\' : (model == 0), \'bpb-size-selector-button-large\' : large}" type="button" ng-disabled="model == 0" ng-click="changeSize(-1)">-</button>',
                        '<button class="bpb-size-selector-button bpb-size-selector-button-plus ng-class: {disabled: model == sizes.length - 1, \'bpb-size-selector-button-large\' : large}" type="button" ng-disabled="model == sizes.length - 1" ng-click="changeSize(1)">+</button>',
                        '<div class="bpb-size-selector-available-sizes">',
                            '<p ng-show="model == null">&nbsp;</p>',
                            '<p ng-repeat="size in sizes" ng-show="$index == model">{{size.size_no}}</p>',
                        '</div>',
                        '<span class="bpb-size-selector-size-changed blue" ng-show="model != default">',
                            'size changed<br>',
                            '<span ng-show="default">(default size is {{sizes[default].size_no}})</span>',
                            '<span ng-show="!default">(no default size)</span>',
                        '</span>',
                    '</div>',
                    '<div ng-show="sizes.length == 0"></div>',
                '</div>'

            ].join('')

        };

    });

}();