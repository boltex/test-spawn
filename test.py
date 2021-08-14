def main():
    import time
    print("Test output program. Ctrl+C to exit.", flush=True)
    try:
        while True:
            print( 'Python script says Hi every 2 sec!', flush=True)
            time.sleep(2)
    except KeyboardInterrupt:
        print("\nExiting", flush=True)

if __name__ == "__main__":
    main()
