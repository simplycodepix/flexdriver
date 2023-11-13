import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";

import { Tile } from "~/features/ui/Tile";
import { Button } from "~/features/ui/Button";

import { useScheduleUI } from "./schedule.store";

const Stopwatch = () => {
  const timerStartTime = useScheduleUI((state) => state.timerStartTime);
  const [elapsedTime, setElapsedTime] = useState(
    dayjs().unix() - timerStartTime,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(dayjs().unix() - timerStartTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStartTime]);

  return <>{dayjs.unix(elapsedTime).format("mm:ss")}</>;
};

export function TimerToggle() {
  const startTimer = useScheduleUI((state) => state.startTimer);
  const stopTimer = useScheduleUI((state) => state.stopTimer);
  const isTimerRunning = useScheduleUI((state) => state.isTimerRunning);

  return (
    <Tile
      startAdornment={<FiClock />}
      endAdornment={
        <Button
          color="secondary"
          onClick={() => {
            if (isTimerRunning) {
              stopTimer();
            } else {
              startTimer(dayjs().unix());
            }
          }}
        >
          {isTimerRunning ? "Stop" : "Start"}
        </Button>
      }
    >
      {isTimerRunning ? <Stopwatch /> : "Press button to start search"}
    </Tile>
  );
}
