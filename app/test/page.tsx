import { CircularProgress } from "@nextui-org/progress";
const TestPage = () => {
    let name = "Veeresh"
    let distance = 10
    return (
        <div>
            {/* Hello this is test page */}
            <div>

                <div>
                    <div className="font-semibold text-xl">
                        Welcome to your Profile
                    </div>
                    <br />
                    <div className="flex justify-center items-center">
                        <CircularProgress
                            classNames={{
                                svg: "w-36 h-36",
                                indicator: "bg-blue-700",
                                track: "bg-blue-200",
                                value: "text-2xl font-semibold text-blue-700",
                            }}
                            value={distance}
                            strokeWidth={4}
                            showValueLabel={true}
                        />
                    </div>
                    <div>
                        <div>{name}</div>
                        <div>
                            Distance Convered : {distance} kms
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default TestPage

