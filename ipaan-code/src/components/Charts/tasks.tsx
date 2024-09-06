import Header from "../Tools/Header";
import { useState } from "react";
import Task from "./Task";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function Tasks() {
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [taskTimes, setTaskTimes] = useState<number[]>([]);
  const [participantNumber, setParticipantNumber] = useState("");

  const handleTaskComplete = (_taskNo: number, timeTaken: number) => {
    setTasksCompleted(tasksCompleted + 1);
    setTaskTimes([...taskTimes, timeTaken]);
  };

  const handleSubmit = () => {
    // Create text content for download
    let textContent = `Participant Number: ${participantNumber}\n`;
    taskTimes.forEach((time, index) => {
      textContent += `Task ${index + 1}: ${time} seconds\n`;
    });

    // Create a blob and download link
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "task_times.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
        <section>
            <Header />
        </section>

    <div className="p-4 mx-auto max-w-4xl">


      <section className="text-center mb-6">
        <h2 className="text-xl font-bold leading-6 text-gray-900 sm:truncate sm:text-lg sm:tracking-tight">
          User Testing Tasks
        </h2>
      </section>

      <div className="flex justify-between items-center mb-6 p-2">
        <div className="flex-1 mr-4">
          <label className="text-xl font-bold leading-6 text-gray-900 sm:truncate sm:text-lg sm:tracking-tight mb-2" htmlFor="participantNumber">
            Participant Number:
          </label>
          <Input
            type="text"
            id="participantNumber"
            value={participantNumber}
            onChange={(e) => setParticipantNumber(e.target.value)}
            className="w-1/4 text-sm"
          />
        </div>
        <Button disabled={tasksCompleted !== 6} onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      <section className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <Task key={index} taskNo={index + 1} onTaskComplete={handleTaskComplete} />
        ))}
      </section>
    </div>
    </div>
  );
}

export default Tasks;
