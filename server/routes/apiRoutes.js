import { tmdbMultiSearch, tmdbSingleSearch } from "../controllers/apiControllers";

const apiRoutes = app => {
    app.route('/search')
        .post(tmdbMultiSearch);
    app.route('/search/:mediaType/:itemID')
        .get(tmdbSingleSearch);
};

export default apiRoutes;