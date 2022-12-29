//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import '@openzeppelin/contracts/access/Ownable.sol';

contract TranslationTask is Ownable {
    struct Task {
        string taskDetail;
        address publisher;
        address[] donators;
        address[] translators;
        bool completed;
    }

    enum TaskStatus {
        translating,
        completed
    }

    mapping(uint256 => Task) public tasks;

    mapping(uint256 => uint256) public taskVault;

    uint256 public totalTasks;

    function getTaskStatus(uint256 taskId)
        public
        view
        returns (TaskStatus status)
    {}

    // @dev roles can decide to create task, complete task.

    // @dev create a translation task
    function createTask(string memory _taskDetail) public {
        Task memory task;
        task.taskDetail = _taskDetail;
        tasks[totalTasks++] = task;
    }

    // @dev every one can donate to start the translation task
    function donateToTask(uint256 taskId) public payable {
        Task storage task = tasks[taskId];
        task.donators.push(msg.sender);

        taskVault[taskId] += msg.value;
    }

    // @dev
    function completeTask(uint256 taskId) public payable {
        Task storage task = tasks[taskId];
        require(!task.completed, 'task has been completed');

        task.completed = true;

        address[] memory translators = task.translators;
        for (uint256 i = 0; i < translators.length; i++) {
            payable(translators[i]).transfer(
                taskVault[taskId] / translators.length
            );
        }
    }
}
