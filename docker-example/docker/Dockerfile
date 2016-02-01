FROM tomcat:7.0.64-jre8
ENV CATALINA_HOME /usr/local/tomcat
MAINTAINER miciu

RUN rm -rf ${CATALINA_HOME}/webapps/examples ${CATALINA_HOME}/webapps/docs ${CATALINA_HOME}/webapps/ROOT ${CATALINA_HOME}/webapps/host-manager ${CATALINA_HOME}/RELEASE-NOTES ${CATALINA_HOME}/RUNNING.txt ${CATALINA_HOME}/bin/*.bat  ${CATALINA_HOME}/bin/*.tar.gz

ADD docker-example.war ${CATALINA_HOME}/webapps/ROOT.war
