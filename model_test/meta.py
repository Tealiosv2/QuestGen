import transformers
import torch

model_id = "meta-llama/Meta-Llama-3-8B"

pipeline = transformers.pipeline(
    "text-generation", model=model_id, model_kwargs={"torch_dtype": torch.bfloat16}, device_map="auto"
)
pipeline("Generate me a quest based on a fantasy world. The location is Caid City where a time travelling scientist is trying to recreate nuclear power.")