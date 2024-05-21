const {useState, useEffect, useRef} = React;

const StopWatch = () => {
    const [timePassedInMilliSeconds, setTimePassed] = useState(0);
    const timer = useRef(null);

    const start = () => {
        if (!timer.current) {
            let startTime = Date.now();
            timer.current = setInterval(() => {
                console.log("timePassedInMilliSeconds:", timePassedInMilliSeconds);
                const stopTime = Date.now();

                // use a call back in setState to get the latest state value
                setTimePassed(timePassedInMilliSeconds => stopTime - startTime + timePassedInMilliSeconds);

                startTime = stopTime;
            }, 1000);
        }
    };

    const stop = () => {
        console.log('stop', timer.current);
        window.clearInterval(timer.current);
        timer.current = null;
    };

    const reset = () => {
        stop();
        setTimePassed(0);
    };

    return (
        <div>
            <h2 className="border px-3 py-4 rounded my-3 mx-auto text-center" style={{maxWidth: "300px"}}>
                {Math.floor(timePassedInMilliSeconds / 1000)} s
            </h2>
            <div className="d-flex justify-content-center">
                <button className="btn btn-outline-primary mr-2" onClick={start}>
                    start
                </button>
                <button className="btn btn-outline-danger mr-2" onClick={stop}>
                    stop
                </button>
                <button className="btn btn-outline-warning" onClick={reset}>
                    reset
                </button>
            </div>
        </div>
    ) 
}

ReactDOM.render(
    <StopWatch />,
    document.getElementById('root')
);