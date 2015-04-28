(function () {
    'use strict'
    App.controller('ProjectEditCtrl', [
        '$scope',
        '$routeParams',
        '$timeout',
        '$sce',
        '$window',
        'gon',
        'Project',
        'User',
        'Post',
        'Reward',
        function ($scope, $routeParams, $timeout, $sce, $window, gon, Project, User, Post, Reward) {

            $scope.shortDescriptionMaxLength = 200;
            $scope.biologyMaxLength = 225;

            $scope.cities = gon.cities;
            $scope.categories = gon.categories;

            var cleanedProjectGon = _.clone(gon.project);
            $scope.project = new Project(cleanedProjectGon);

            $scope.creator = gon.currentUser;
            $scope.rewards = $scope.project.rewards;

            $scope.posts = $scope.project.posts

            $scope.successMessage = null;

            $scope.showErrorMessage = false;
            $scope.showSpinner = false;

            $scope.$on('setFormDirty', function() {
               $scope.projectForm.$setDirty();
            });

            $window.onbeforeunload = function () {
                if ($scope.projectForm.$dirty) {
                    return "Những thay đổi chưa được lưu sẽ bị mất."
                }
            };

            $scope.saveProject = function () {

                if ($scope.projectForm.$pristine)
                    return false;

                $scope.savingProject = true;

                $scope.project.save()
                    .then(function (res) {
                        $scope.savingProject = false;
                        if (res.errors) {

                        } else {
                            $scope.projectForm.$setPristine();
                        }
                    }, function (res) {
                        $scope.savingProject = false;
                        console.log(res);
                    });

            }

            $scope.showLaunchProject = function() {
                var project = $scope.project;
                var durationType = project.durationType;

                var deadline = moment();
                var duration = 0;
                if (durationType == "duration") {
                    deadline.add(project.duration, "days").endOf("day");
                    duration = project.duration;
                } else {
                    deadline = moment.tz(project.deadline, "DD-MM-YYYY", "Asia/Ho_Chi_Minh").endOf("day");
                    duration = deadline.diff(moment(), "days")
                }

                var description = duration + " ngày sau khi khởi động dự án";
                description += "<br/>";
                description += deadline.format("HH:mm:ss [ngày] DD MMMM [năm] YYYY");

                $scope.projectDeadlineDescription = $sce.trustAsHtml(description);

                $("#modal_launch_project").modal("show");
            }

            $scope.launchProject = function () {
                var resource = new Project($scope.project);
                resource.launch()
                    .then(function (response) {
                        console.log(response);
                    }, function (response) {

                    });
            }

            var posts = function () {
                return $scope.posts ? $scope.posts : [];
            }();
            var selectedPost = null;

            var postIndexById = function (post) {
                return _.findIndex(posts, function (obj) {
                    return post.id === obj.id;
                });
            };

            var findPost = function (id) {
                return _.select(posts, function (obj) {
                    return id === obj.id;
                });
            };

            $scope.showCreatePost = function () {
                var post = {
                    body: ""
                };

                $scope.setPost(post);
            }

            $scope.setPost = function (post) {
                $scope.post = angular.copy(post);
                $("#modal_add_story_post").modal("show");
            }

            $scope.savePost = function () {
                var resource = new Post(_.extend($scope.post, {projectId: $scope.project.id}));
                resource.save()
                    .then(function (response) {
                        var post = response.post;
                        if (post.errors) {
                            $scope.post.errors = post.errors;
                        } else {
                            posts[postIndexById(post)] = post;
                            if (findPost(post.id).length === 0) {
                                posts.push(post);
                            }
                            $("#modal_add_story_post").modal("hide");
                        }
                    });
            }

            $scope.deletePost = function (post, index) {
                var confirmDelete = confirm("Bạn có chắc bạn muốn xóa câu chuyện này?");

                if (!confirmDelete)
                    return false;

                var index = postIndexById(post);
                if (index >= 0) {
                    var resource = new Post(_.extend(post, {projectId: $scope.project.id}));
                    resource.delete().then(function (res) {
                        posts.splice(index, 1)
                    });
                }
                return posts;
            }

            var rewards = function () {
                return $scope.project.rewards ? $scope.project.rewards : [];
            }();
            var selectedReward = null;

            var rewardIndexById = function (reward) {
                return _.findIndex(rewards, function (obj) {
                    return reward.id === obj.id;
                });
            };

            var findReward = function (id) {
                return _.select(rewards, function (obj) {
                    return id === obj.id;
                });
            };

            $scope.showCreateReward = function () {
                var reward = {
                    limit_quantity: 0
                };

                $scope.setReward(reward);
            }

            $scope.setReward = function (reward) {
                $scope.reward = angular.copy(reward);
                $("#modal_add_reward").modal("show");
            }

            $scope.saveReward = function () {
                var resource = new Reward(_.extend($scope.reward, {projectId: $scope.project.id}));
                resource.save()
                    .then(function (response) {
                        var reward = response.reward;
                        if (reward.errors) {
                            $scope.reward.errors = reward.errors;
                        } else {
                            rewards[rewardIndexById(reward)] = reward;
                            if (findReward(reward.id).length === 0) {
                                rewards.push(reward);
                            }
                            $("#modal_add_reward").modal("hide");
                        }
                    });
            }

            $scope.deleteReward = function (reward, index) {
                var confirmDelete = confirm("Bạn có chắc bạn muốn xóa phần thưởng này?");

                if (!confirmDelete)
                    return false;

                var index = rewardIndexById(reward);
                if (index >= 0) {
                    var resource = new Reward(_.extend(reward, {projectId: $scope.project.id}));
                    resource.delete().then(function (res) {
                        rewards.splice(index, 1)
                    });
                }
                return rewards;
            }


            var showSuccessMessage = function (message) {
                $scope.successMessage = message;
                $timeout(function () {
                    $scope.successMessage = null;
                }, 5000);
            }

        }]);
})();