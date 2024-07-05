import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { toast } from "sonner";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: "", description: "", dueDate: null, priority: "Low" });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleDateChange = (date) => {
    setTask({ ...task, dueDate: date });
  };

  const handlePriorityChange = (priority) => {
    setTask({ ...task, priority });
  };

  const handleAddTask = () => {
    if (editingIndex !== null) {
      const updatedTasks = tasks.map((t, index) => (index === editingIndex ? task : t));
      setTasks(updatedTasks);
      setEditingIndex(null);
      toast("Task updated successfully!");
    } else {
      setTasks([...tasks, task]);
      toast("Task added successfully!");
    }
    setTask({ title: "", description: "", dueDate: null, priority: "Low" });
  };

  const handleEditTask = (index) => {
    setTask(tasks[index]);
    setEditingIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    toast("Task deleted successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">TodoMaster</h1>
        <p className="text-lg text-muted-foreground">Your personal task manager</p>
      </header>
      <main>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add a New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Input
                name="title"
                placeholder="Task Title"
                value={task.title}
                onChange={handleInputChange}
              />
              <Textarea
                name="description"
                placeholder="Task Description"
                value={task.description}
                onChange={handleInputChange}
              />
              <Calendar
                mode="single"
                selected={task.dueDate}
                onSelect={handleDateChange}
                className="rounded-md border"
              />
              <Select value={task.priority} onValueChange={handlePriorityChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddTask}>
                {editingIndex !== null ? "Update Task" : "Add Task"}
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-4">
          {tasks.map((task, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{task.description}</p>
                <p>Due Date: {task.dueDate ? format(task.dueDate, "PPP") : "No due date"}</p>
                <p>Priority: {task.priority}</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" onClick={() => handleEditTask(index)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteTask(index)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;