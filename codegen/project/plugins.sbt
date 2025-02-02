addSbtPlugin("com.dwijnand"      % "sbt-dynver"       % "4.1.1")
addSbtPlugin("de.heikoseeberger" % "sbt-header"       % "5.6.0")
addSbtPlugin("org.scalameta"     % "sbt-scalafmt"     % "2.4.2")
addSbtPlugin("org.wartremover"   % "sbt-wartremover"  % "2.4.13")
addSbtPlugin("org.scalameta"     % "sbt-native-image" % "0.3.0")
addSbtPlugin("com.eed3si9n"      % "sbt-buildinfo"    % "0.10.0")
addSbtPlugin("com.eed3si9n"      % "sbt-assembly"     % "0.15.0")

addSbtPlugin("com.thesamet" % "sbt-protoc" % "1.0.2")

libraryDependencies += "com.thesamet.scalapb" %% "compilerplugin" % "0.11.3"
