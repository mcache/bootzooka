"use strict";

angular.module('smlBootzooka.profile').controller("ProfileCtrl", function ProfileCtrl($scope, UserSessionService, ProfileService, NotificationsService) {
    $scope.login = UserSessionService.loggedUser.login.concat();
    $scope.email = UserSessionService.loggedUser.email.concat();

    var self = this;

    function showError(error) {
        if (angular.isDefined(error) && angular.isDefined(error.value)) {
            NotificationsService.showError(error.value);
        }
    }

    $scope.changeLogin = function () {
        if (self.shouldPerformLoginChange()) {
            ProfileService.changeLogin($scope.login, function () {
                UserSessionService.loggedUser.login = $scope.login.concat();
                NotificationsService.showSuccess("Login changed!");
                $scope.profileForm.login.$dirty = false;
                $scope.profileForm.login.$pristine = true;
            }, showError);
        }
    };

    this.shouldPerformLoginChange = function () {
        return $scope.profileForm.login.$dirty && $scope.login !== UserSessionService.loggedUser.login && $scope.profileForm.login.$valid;
    };

    $scope.changeEmail = function () {
        if (self.shouldPerformEmailChange()) {
            ProfileService.changeEmail($scope.email, function () {
                UserSessionService.loggedUser.email = $scope.email;
                NotificationsService.showSuccess("Email changed!");
                $scope.profileForm.email.$dirty = false;
                $scope.profileForm.email.$pristine = true;
            }, showError);
        }
    };

    this.shouldPerformEmailChange = function () {
        return $scope.profileForm.email.$dirty && $scope.email !== UserSessionService.loggedUser.email && $scope.profileForm.email.$valid;
    };

    $scope.currentPassword = undefined;
    $scope.newPassword = undefined;
    $scope.newPasswordRepeated = undefined;

    $scope.changePassword = function () {
        $scope.passwordChangeForm.currentPassword.$dirty = true;
        $scope.passwordChangeForm.newPassword.$dirty = true;
        $scope.passwordChangeForm.newPasswordRepeated.$dirty = true;
        if ($scope.passwordChangeForm.$valid) {
            ProfileService.changePassword($scope.currentPassword, $scope.newPassword, function () {
                NotificationsService.showSuccess("Password changed!");
                $scope.passwordChangeForm.$setPristine();
                $scope.currentPassword = undefined;
                $scope.newPassword = undefined;
                $scope.newPasswordRepeated = undefined;
            }, showError);
        }
    };
});