const responseMiddleware = (req, res, next) => {
  console.log(res.data);
  switch (res.status) {
    case 200:
      res.status(200).json({
        status: "success",
        error: false,
        code: 200,
        message: "Success, everything went well",
        data: res.data.data ?? "Success",
      });
      break;
  }

  // TODO: Implement middleware that returns result of the query
  next();
};

export { responseMiddleware };
