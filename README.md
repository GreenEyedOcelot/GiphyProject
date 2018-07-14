# GiphyProject

This assignment has some extra features that go beyond the spec:

1. While the default behavior is to replace the current gif images with 10 different images, 
menus allow the user to specify both the number of images added to the page, and also whether
these images should replace, prepend, or append (to) the current ones.

2. The page is designed with responsive principles in mind.

3. When the same button is clicked repeatedly, different gifs are returned each time.
This occurs because the offset value is changed with each button click.

4. The application has buttons to clear the current gifs, reset the buttons back to the original list, 
or to reload the entire page.

5. Error checking is done with the response object to ensure that display code is only executed if 
it makes sense to do so, e.g. it does not make sense to run display code if an error code is returned, or if
zero results are returned.

6. The image title is displayed as well as the name.

7. Spent some time making the app pleasant to look at and feel nice to use.
