const aws = {
  Auth: {
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_AWS_COGNITO_POOL_ID,
    identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
  },
  Storage: {
    AWSS3: {
      region: process.env.REACT_APP_AWS_REGION,
      bucket: process.env.REACT_APP_AWS_IMAGE_UPLOAD_S3_BUCKET,
    },
  },
};

export default aws;
