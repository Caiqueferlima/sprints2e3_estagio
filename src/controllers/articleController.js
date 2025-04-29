const {
  articleSearchService,
  articlePopularService,
} = require('../services/articleService');

const CustomError = require('../helpers/CustomError');

exports.articleSearchController = async (request, response) => {
  const { begin_date, end_date, q, sort } = request.query;

  try {
    const queries = {
      begin_date,
      end_date,
      q,
      sort,
    };

    const articlesSearch = await articleSearchService(queries);
    response.status(200).json(articlesSearch);
  } catch (error) {
    if (error instanceof CustomError) {
      response.status(error.statusCode).json({
        statusCode: error.statusCode,
        name: error.name,
        message: error.message,
      });
    } else {
      response.status(500).json({ message: 'Internal server error' });
    }
  }
};

exports.articlePopularController = async (_, response) => {
  try {
    const articlesPopular = await articlePopularService();
    response.status(200).json(articlesPopular);
  } catch (error) {
    if (error instanceof CustomError) {
      response.status(error.statusCode).json({
        statusCode: error.statusCode,
        name: error.name,
        message: error.message,
      });
    } else {
      response.status(500).json({ message: 'Internal server error' });
    }
  }
};
