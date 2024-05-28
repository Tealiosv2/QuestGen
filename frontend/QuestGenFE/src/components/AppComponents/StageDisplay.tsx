function StageDisplay({ StageMessages }) {
    return (
        <>
            <div style={{ width: "50vw" }}>
                <div style={{ height: "50%" }}>Image</div>
                <div style={{ height: "50%" }}>
                    {StageMessages.map((StageMessage) => {
                        return (
                            <div key={StageMessage.key}>
                                {StageMessage.content}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default StageDisplay;
