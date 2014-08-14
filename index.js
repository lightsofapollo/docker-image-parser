/**
Parse the given repo tag name (as a string) and break it out into repo/tag pair.

    // if given the input http://localhost:8080/james/image:latest
    {
      repository: 'http://localhost:8080/',
      user: 'james',
      image: 'image',
      tag: 'latest'
    }

    // if given the input registry
    {
      image: 'registry'
    }

@param String input e.g: 'repo/foo', 'ubuntu', 'ubuntu:latest'
@return {Object} see above example...
*/
module.exports = function parse(input) {
  var colonPos = input.lastIndexOf(':');

  // no colon
  if (colonPos < 0) {
    return { repository: input };
  }

  // last colon is either the tag (or part of a port designation)
  var tag = input.slice(colonPos + 1);

  // if it contains a / its not a tag and is part of the url
  if (tag.indexOf('/') === -1) {
    return {
      repository: input.slice(0, colonPos),
      tag: tag
    };
  }

  return { repository: input };
}
