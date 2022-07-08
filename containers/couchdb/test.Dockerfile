FROM couchdb:latest
VOLUME ["/opt/couchdb/data"]
COPY "containers/couchdb/local.ini" "/opt/couchdb/etc/"
WORKDIR /opt/couchdb

ENV COUCHDB_USER=admin
ENV COUCHDB_PASSWORD=123456

EXPOSE 5984

ENV COUCHDB_CREATE_DATABASE=yes