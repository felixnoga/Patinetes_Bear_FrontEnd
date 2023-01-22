export const Mark = ({children, feature }) => {
    const markerClicked = () => {
        window.alert(feature.properties.description);
    };

    return (
        <button onClick={()=>markerClicked()} className="marker">
            {children}
        </button>
    );
};