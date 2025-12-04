#!/usr/bin/env python3
import os
import sys
import tensorflow as tf

os.chdir(os.path.dirname(__file__))
sys.path.insert(0, os.getcwd())

model_path = "app/models/my_model.keras"

try:
    print("Loading model...")
    model = tf.keras.models.load_model(model_path, compile=False)
    
    print(f"Input shape: {model.input_shape}")
    print(f"Output shape: {model.output_shape}")
    print(f"Number of outputs: {len(model.outputs)}")
    
    # Get last layer output size (number of classes)
    last_layer = model.layers[-1]
    print(f"Last layer name: {last_layer.name}")
    print(f"Last layer type: {type(last_layer).__name__}")
    print(f"Last layer output shape: {last_layer.output_shape}")
    
    # Try to extract class count
    if hasattr(last_layer, 'units'):
        print(f"Number of classes (units): {last_layer.units}")
    
    # Model config
    if hasattr(model, 'class_names'):
        print(f"Model has class_names: {model.class_names}")
    
    # Write to file
    with open("model_info.txt", "w") as f:
        f.write(f"Input shape: {model.input_shape}\n")
        f.write(f"Output shape: {model.output_shape}\n")
        f.write(f"Last layer output: {last_layer.output_shape}\n")
    
    print("\nModel info written to model_info.txt")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
