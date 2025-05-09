import math

class Pagination():
    def __init__(self,items=None,page_size=10):
        if(items == None):
            items=[]
        self.items=items
        self.page_size=page_size
        self.current_idx=0
        self.total_pages=math.ceil(len(self.items)/self.page_size)

    def get_visible_items(self):
        start_idx=self.current_idx * self.page_size
        end_idx = start_idx + self.page_size
        return self.items[start_idx:end_idx]
    
    def go_to_page(self,page_num):
        if page_num < 1 or page_num > self.total_pages:
            raise ValueError(f"Page number must be between 1 and {self.total_pages}")
        self.current_idx=(page_num - 1)
    
    def first_page(self):
        self.current_idx=0

    def last_page(self):
        self.current_idx=(self.total_pages - 1) 
    def next_page(self):
        if self.current_idx + self.page_size < len(self.items):
            self.current_idx += self.page_size
        else:
            raise ValueError("Already on the last page")
    def previous_page(self):
        if self.current_idx - self.page_size >= 0:
            self.current_idx -= self.page_size
        else:
            raise ValueError("Already on the first page")
    def __str__(self):
        return "\n".join(self.get_visible_items())
    

alphabetList = list("abcdefghijklmnopqrstuvwxyz")
p = Pagination(alphabetList, 4)

print(p.get_visible_items())
# ['a', 'b', 'c', 'd']

p.next_page()
print(p.get_visible_items())
# ['e', 'f', 'g', 'h']

p.last_page()
print(p.get_visible_items())
# ['y', 'z']

p.go_to_page(7)
print(p.current_idx + 1)
Output: 7

# p.go_to_page(0)
# Raises ValueError


