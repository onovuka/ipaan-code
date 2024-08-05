import { useState, useEffect, useRef } from 'react';
import { CardContent } from '../Tools/Card';
import { Button } from '../ui/button';

interface Props {
  taskNo: number;
  onTaskComplete: (taskNo: number, timeTaken: number) => void;
}

function Task({ taskNo, onTaskComplete }: Props) {
  const [isStarted, setIsStarted] = useState(false);
  const [taskStatus, setTaskStatus] = useState('Task not started');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    setTaskStatus('Task in progress...');
    startTimeRef.current = performance.now();
    timerRef.current = setInterval(() => {
      // No need to update timeTaken, just keep the interval running
    }, 1000);
  };

  const handleComplete = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = null;
    setTaskStatus('Task completed');

    const endTime = performance.now();
    const timeTakenInSeconds = (endTime - startTimeRef.current!) / 1000;
    startTimeRef.current = null; // Reset startTime for next task

    onTaskComplete(taskNo, timeTakenInSeconds);
  };

  return (
    <div>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold leading-6 text-gray-900 sm:truncate sm:text-lg sm:tracking-tight mb-4">Task {taskNo}</p>
          <div className="flex space-x-4">
            <Button disabled={isStarted} onClick={handleStart}>
              Start Task
            </Button>
            <Button disabled={!isStarted} onClick={handleComplete}>
              Complete Task
            </Button>
          </div>
        </div>
        <p>{taskStatus}</p>
      </CardContent>
    </div>
  );
}

export default Task;
