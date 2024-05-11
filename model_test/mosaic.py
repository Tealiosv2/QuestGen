

import torch

if torch.cuda.is_available():
    print(torch.version.cuda)
else:
    print("CUDA is not available.")