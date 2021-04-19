const fetch = require('node-fetch');

// TODO MAKE SURE TO USE API KEY AS A HEADER AND NOT IN THE URL
export const tmdbMultiSearch = async (req, res) => {
    try {
        let response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${req.body.searchText}&page=1&adult=false`);
        let json = await response.json();
        res.json(json.results);
    } catch (err) {
        console.error(err);
    }
};

export const tmdbSingleSearch = async (req, res) => {
    try {
        let response = await fetch(`https://api.themoviedb.org/3/${req.params.mediaType}/${req.params.itemID}?api_key=${process.env.TMDB_API_KEY}&language=en-US&adult=false&append_to_response=credits`);
        let item = await response.json();
        item = buildItemModel(item, req.params.mediaType);
        res.json(item);
    } catch (err) {
        console.error(err);
    }
}

const buildItemModel = (item, mediaType) => {
    if (mediaType === 'tv') {
        item.title = item.name;
        item.release_date = item.first_air_date;
        item.runtime = null;
    }

    let actors = item.credits.cast.slice(0, 10);
    actors = actors.map(person => {
        return { fullName: person.name };
    });

    let director = item.credits.crew.filter(person => person.job === 'Director');
    director = director.map(director => {
        return { fullName: director.name };
    });

    const genre = item.genres.map(genre => genre.name);

    const imageURL = `https://image.tmdb.org/t/p/w92/${item.poster_path}`;

    const releaseDate = item.release_date.substring(0, 4);
    const runTime = item.runtime;
    const title = item.title;
    const tmdbID = item.id;

    return {
        actors,
        director,
        genre,
        imageURL,
        releaseDate,
        runTime,
        title,
        tmdbID
    };
};