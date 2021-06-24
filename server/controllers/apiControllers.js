const fetch = require('node-fetch');

export const tmdbMultiSearch = async (req, res) => {
    try {
        let response = await fetch(
            `https://api.themoviedb.org/3/search/multi?&language=en-US&query=${req.body.searchText}&page=1&adult=false`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.TMDB_API_TOKEN}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        );
        let json = await response.json();
        let resultList = [];
        // standardize the results from TMDB due to differences in TV shows and movies
        json.results.forEach(result => {
                if (result.media_type !== 'person') {
                    let { first_air_date, id, media_type, name, poster_path, release_date, title } = result;
                    if (!title) title = name;
                    if (!release_date) release_date = first_air_date;
                    if (title.length > 20) title = title.slice(0, 17).concat('...');
                    let year;
                    release_date ? year = release_date.substring(0, 4) : year = '';
                    poster_path === null ? poster_path = 'https://via.placeholder.com/92x138.png?text=No+Image+Available' : poster_path = `https://image.tmdb.org/t/p/w300${poster_path}`;
                    const resultItem = {
                        id,
                        media_type,
                        posterURL: poster_path,
                        title,
                        year
                    };
                    resultList.push(resultItem);
                }
        });
        res.json(resultList);
    } catch (err) {
        console.error(err);
    }
};

// Query TMDB and manipulate return to only pass through pertinent data for saving to Mongo
export const tmdbSingleSearch = async (req, res) => {
    try {
        let response = await fetch(
            `https://api.themoviedb.org/3/${req.params.mediaType}/${req.params.itemID}?&language=en-US&adult=false&append_to_response=credits`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.TMDB_API_TOKEN}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        );
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
    let imageURL = '';
    item.poster_path === 'null' ? imageURL = 'https://via.placeholder.com/92x138.png?text=No+Image+Available' : imageURL = `https://image.tmdb.org/t/p/w300${item.poster_path}`;

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