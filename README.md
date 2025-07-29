# Nginx Configuration Repository

This repository contains nginx configuration files and static web content for ewenlau.net.

## Structure

- `config/` - Nginx configuration files
  - `nginx.conf` - Main nginx configuration
  - `conf.d/` - Additional configuration files
- `site/` - Static web content
  - HTML files, CSS, JavaScript, and error pages
- `.github/workflows/` - GitHub Actions CI/CD pipeline

## Testing Infrastructure

This repository includes comprehensive automated testing via GitHub Actions:

### CI Pipeline Features

1. **Nginx Configuration Validation**
   - Syntax checking of all nginx configuration files
   - Compatibility testing with current nginx versions

2. **HTML Content Validation**
   - HTML syntax validation using tidy
   - Basic structure and format checking

3. **Security Scanning**
   - Detection of common nginx security misconfigurations
   - Checks for sensitive information in configuration files
   - Security headers validation

4. **Docker Integration Testing**
   - Builds a test container with the configuration
   - Validates that nginx starts successfully
   - Tests basic HTTP responses
   - Validates error page accessibility

5. **Comprehensive Validation**
   - Combines results from all test stages
   - Provides summary of configuration health

### Running Tests Locally

To test the nginx configuration locally:

```bash
# Test configuration syntax (requires nginx)
sudo nginx -t -c /path/to/config/nginx.conf

# Validate HTML files (requires tidy)
find site -name "*.html" -exec tidy -q -e {} \;

# Test with Docker
docker build -f- -t nginx-test . << 'EOF'
FROM nginx:alpine
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/conf.d/ /etc/nginx/conf.d/
COPY config/mime.types /etc/nginx/mime.types
COPY site/ /site/
RUN mkdir -p /logs && nginx -t
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

docker run -d --name test -p 8080:80 nginx-test
curl http://localhost:8080
docker stop test && docker rm test
```

## Automated Deployment

The CI pipeline runs automatically on:
- Push to main/master branch
- Pull requests to main/master branch

All tests must pass before code can be merged to the main branch.