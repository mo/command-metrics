# command-metrics

command-metrics is a script that can periodally save measurements for things
that can be measured using a shell command that prints a single integer or float
value.

command-metrics also offers some basic analysis features like selecting a range
and seeing how much each series changed both in absolute numbers and as a
percentage during that period.

Data is stored in .csv files which ("per spec") use CRLF line endings, so if
you keep command-metrics data in a git repo it's good to set:

  git config core.whitespace cr-at-eol

for that particular repository. It will instruction git not to emit the usual
trailing whitespace error for CR.

## License

GPLv3
