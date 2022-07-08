// ESM
import Fastify from "fastify";
// import og from 'open-graph'
import ogs from "open-graph-scraper";

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get<{
  Querystring: { url: string };
}>("/", (request, reply) => {
  if (request.query && request.query.url) {
    // og(request.query.url, (err, meta) => {
    //   reply.send({ meta })
    // })
    const options = { url: request.query.url };
    ogs(options, (error, results, response) => {
      console.log("results", results);
      if (!error) {
        reply.send({ meta: results });
      } else {
        reply.send({ meta: null });
      }
    });
  } else {
    reply.send({ meta: null });
  }
});

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // eslint-disable-next-line no-console
  console.log(`Server is now listening on ${address}`);
  // Server is now listening on ${address}
});
