export function CompareToDirective($parse) {
    'ngInject'

    return{
        require: "ngModel",
        link: function name(scope, elm, attrs, ngModel) {
            //Mainmidel is going to the main model of the syntax
            var mainModel = $parse(attrs.compareTo);
            var secondModel = $parse(attrs.ngModel);

            //$watch looks for changes in our scope
            scope.$watch(attrs.ngModel,function (newValue) {
                ngModel.$setValidity(attrs.name, newValue === mainModel(scope))
            })
            scope.$watch(attrs.compareTo, function name(newValue) {
                ngModel.$setValidity(attrs.name, newValue === secondModel(scope))
            })
        }
    }
}