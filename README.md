### a web application


# use docker to develop
```
npm run build
sudo docker build docker.ifeng.com/demo/demo-whale:dev .
sudo docker run --rm -p 3000:3000 docker.ifeng.com/demo/demo-whale:dev
```

# docker compile image
```
sudo docker build -t docker.ifeng.com/demo/demo-whale:compile-v0.01 . -f dockerfile.compile
sudo docker push docker.ifeng.com/demo/demo-whale:compile-v0.01 
```