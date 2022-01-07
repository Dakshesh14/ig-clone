import string
import random


def random_string_generator(size=10, chars=string.ascii_lowercase + string.digits):
    """This function will return random characters. If the size is not specified
    than the function will return 10 character long string."""
    return ''.join(random.choice(chars) for _ in range(size))
