

const ColorPicker: React.FC = () => {
    const colors: string[] = [
        "#000000ff",
        "#ff0000ff",
        "#00ff00ff",
        "#0000ffff"
    ]

    return (
        <div className="col-md-2 d-flex">
            {colors.map((color, index) => (
                <div key={index} className="color-picker row d-flex" style={{ backgroundColor: color }} />
            ))}
        </div>
    );
};

export default ColorPicker;