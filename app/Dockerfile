# Python image to use.
FROM python:3.9-slim
# TODO: Cache libroffice packages
RUN apt-get update && apt-get -y -q --no-install-recommends install libreoffice 
WORKDIR /usr/local/app

# copy the requirements file used for dependencies
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Copy the rest of the working directory contents into the container at /app
COPY . .

# Run app.py when the container launches
# TODO: Setup gunicorn

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app
