from django import template

register = template.Library()

@register.filter()
def to_int(value):
    return int(value)


@register.filter
def get_responses(responses, pk):
    return responses.response.filter(corresponds = pk)

@register.filter
def get_marks(response,id):
    res = response.response.all()
    res = res.filter(corresponds = id)[0]
    return res.score

@register.filter
def is_response(responses, pk):
    for i in responses:
        if int(i.ans) == int(pk):
            return True
    return 