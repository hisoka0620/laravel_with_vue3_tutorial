<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //
    public function index()
    {
        return Task::all()->where('confirmed', 0);
    }

    public function getComplete()
    {
        return Task::all()->where('confirmed', 1);
    }

    public function show(Task $task)
    {
        return $task;
    }

    public function store(Request $request)
    {
        return Task::create($request->all());
    }

    public function update(Request $request, Task $task)
    {
        $task->update($request->all());

        return $task;
    }

    public function completed(Task $task)
    {
        $task->confirmed = 1;
        $task->save();

        return $task;
    }

    public function cancelCompleted(Task $task)
    {
        $task->confirmed = 0;
        $task->save();

        return $task;
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return $task;
    }
}
