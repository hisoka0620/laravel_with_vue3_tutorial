<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //
    public function index(Request $request)
    {
        $completed = $request->query('completed');
        $deadline = $request->query('deadline');
        $now = Carbon::now()->toDateTimeString();
        $query = Task::query();
        if (!is_null($completed)) {
            $query = $query->where('confirmed', 1)->get();
            return $query;
        } elseif (!is_null($deadline)) {
            $query = Task::where('deadline', '<', $now)->get();
            return $query;
        } else {
            $query = $query->where('confirmed', 0)->where('deadline', '>', $now)->orWhere(function ($query) {
                $query->where('confirmed', 0)->where('deadline', null);
            })->get();
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
