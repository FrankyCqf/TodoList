angular.module('taskList', []).controller('TaskController', function ($scope, dateFilter) {
    var tmp = localStorage.getItem('taskList');

    $scope.taskList = tmp ? angular.fromJson(tmp) : [];

    //ͳ��δ����
    $scope.count = function () {
        var count = 0;
        angular.forEach($scope.taskList, function (task) {
            count += Number(task.due)>Number(getNowTime()) ? 0 : 1;
        });
        return count;
    };

    //ͳ�������
    $scope.countDone = function () {
        var count = 0;
        angular.forEach($scope.taskList, function (task) {
            count += Number(task.due)>Number(getNowTime()) ? 1 : 0;
        });
        return count;
    };

    //���ȫ�����
    $scope.allDone = function () {
        angular.forEach($scope.taskList, function (task) {
            task.done = $scope.isAllDone;
        });
        $scope.save();
    }

    $scope.hasTask = function () {
        return $scope.taskList.length > 0;
    }

    //����
    $scope.addTask = function () {
        if($scope.taskTitle != null && $scope.taskText != null && $scope.taskDue != null ){
            $scope.taskList.push({ id: $scope.taskList.length + 1, title: $scope.taskTitle,text: $scope.taskText,due:$scope.taskDue });
            $scope.save();
            $scope.taskTitle = null;
            $scope.taskText = null;
            $scope.taskDue = null;
        }

    };

    //ɾ��
    $scope.removeTask = function (todo) {
        $scope.taskList.splice($scope.taskList.indexOf(todo), 1);
        $scope.save();
    };

    //����
    $scope.save = function () {
        //���л���ʱ��ʹ��angular.toJson����Ϊng-repeat���ڶ����ڲ����$$hashkey���ԣ�ʹ��JSON.stringify���л��������
        localStorage.setItem('taskList', angular.toJson($scope.taskList));
    }

    function getNowTime() {
        return dateFilter(new Date(), 'yyyyMMdd');
    }

});

