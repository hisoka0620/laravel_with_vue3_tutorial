<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //
    public function index(Request $request)
    {
        $completed = $request->query('completed');
        $query = Task::query();
        if (!is_null($completed)) {
            $query = $query->where('confirmed', 1)->get();
            return $query;
        } else {
            $query = $query->where('confirmed', 0)->get();
            return $query;
        }
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

    public function destroy(Task $task)
    {
        $task->delete();

        return $task;
    }
}
