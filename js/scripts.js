
// Nav search logic, it is totally fake
$(function() {
    const data = [{
        type: "Course",
        title: "<strong>Get started</strong> with custom visuals",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie ullamcorper dolor et feugiat.",
        value: "Get started with custom visuals",
    }, {
        type: "Quiz",
        title: "<strong>Get started</strong> with custom visuals",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie ullamcorper dolor et feugiat.",
        value: "Get started with custom visuals",
    }];

    var substringMatcher = function(data) {
        return function findMatches(q, cb) {
            var matches, substringRegex;
            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(data, function(i, item) {
                if (substrRegex.test(item.value)) {
                    matches.push(item);
                }
            });

            if (matches.length > 0) {
                matches.push({
                    type: "show-more",
                    title: "",
                    description: "",
                    value: '',
                });
            }

            cb(matches);
        };
    };

    $('input[type=search]').typeahead(null, {
        name: 'best-pictures',
        display: 'value',
        source: substringMatcher(data),
        templates: {
            empty: [
                '<div class="empty-message text-center my-5">',
                '<h4>No Results Found</h4>',
                '<a href="search.html" class="text-decoration-none text-primary font-size-18px" mt-3>Try Again</a>',
                '</div>'
            ].join('\n'),
            suggestion: function(data) {
                console.log(data);
                if (data.type == 'show-more') {
                    return [
                        '<div class="more-results text-center mt-4">',
                        '<a href="search.html" class="text-decoration-none text-primary font-size-18px">More results</a>',
                        '</div>'
                    ].join('\n');
                } else {
                    return [
                        '<div class="typeahead-search-item table-hover py-4">',
                        `<div class="search-header"><span class="course-type pe-3">${data.type}</span><span class="course-title font-size-18px text-black ps-3">${data.title}</span></div>`,
                        `<div class="search-description font-size-16px text-black"><span>${data.description}</span>`,
                        '</div>'
                    ].join('\n');
                }
            }
        }
    });
});