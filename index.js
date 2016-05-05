angular.module('taskList', []).controller('TaskController', function ($scope, dateFilter) {
    var tmp = localStorage.getItem('taskList');

    $scope.taskList = tmp ? angular.fromJson(tmp) : [];

    //统计未逾期
    $scope.count = function () {
        var count = 0;
        angular.forEach($scope.taskList, function (task) {
            count += Number(task.due)>Number(getNowTime()) ? 0 : 1;
        });
        return count;
    };

    //统计已完成
    $scope.countDone = function () {
        var count = 0;
        angular.forEach($scope.taskList, function (task) {
            count += Number(task.due)>Number(getNowTime()) ? 1 : 0;
        });
        return count;
    };

    //标记全部完成
    $scope.allDone = function () {
        angular.forEach($scope.taskList, function (task) {
            task.done = $scope.isAllDone;
        });
        $scope.save();
    }

    $scope.hasTask = function () {
        return $scope.taskList.length > 0;
    }

    //新增
    $scope.addTask = function () {
        if($scope.taskTitle != null && $scope.taskText != null && $scope.taskDue != null ){
            $scope.taskList.push({ id: $scope.taskList.length + 1, title: $scope.taskTitle,text: $scope.taskText,due:$scope.taskDue });
            $scope.save();
            $scope.taskTitle = null;
            $scope.taskText = null;
            $scope.taskDue = null;
        }

    };

    //删除
    $scope.removeTask = function (todo) {
        $scope.taskList.splice($scope.taskList.indexOf(todo), 1);
        $scope.save();
    };

    //保存
    $scope.save = function () {
        //序列化的时候使用angular.toJson，因为ng-repeat会在对象内部添加$$hashkey属性，使用JSON.stringify序列化不会过滤
        localStorage.setItem('taskList', angular.toJson($scope.taskList));
    }

    function getNowTime() {
        return dateFilter(new Date(), 'yyyyMMdd');
    }

});

