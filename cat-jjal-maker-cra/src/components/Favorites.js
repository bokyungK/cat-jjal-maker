import CatItem from "./CatItem";

function Favorites({ favoriteCat }) {
    if (favoriteCat.length === 0) {
        return <div>사진 위 하트를 눌러 고양이 사진을 저장해봐요!</div>;
    }

    return (
        <ul className="favorites">
        {favoriteCat.map((cat) => (
            <CatItem img={cat} key={cat} />
        ))}
        </ul>
    );
}

export default Favorites;