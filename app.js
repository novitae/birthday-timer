$(document).ready(function(){
    $("#submit").click(function(e){
        e.preventDefault();
    
        var input = $("#dob-input").val();
        var dob = new Date(input);
        save(dob);
        renderAgeLoop();
    });

    function save(dob)
    {
        localStorage.dob = dob.getTime();
    };

    function load()
    {
        var dob;
        if (dob = localStorage.getItem("dob"))
        {
            return new Date(parseInt(dob));
        }
        return -1;
    };

    function renderAgeLoop()
    {
        var dob = load();
        var age = getAge(dob);
        $("#choose").css("display", "none");
        $("#countdown-container").css("display", "block");

        setInterval(function(){
            var countdown = getCountdown(dob);
            $("#months").html(countdown.months.toString().padStart(2, '0'));
            $("#days").html(countdown.days.toString().padStart(2, '0'));
            $("#hours").html(countdown.hours.toString().padStart(2, '0'));
            $("#minutes").html(countdown.minutes.toString().padStart(2, '0'));
            $("#seconds").html(countdown.seconds.toString().padStart(2, '0'));
            $("#milliseconds").html(countdown.milliseconds.toString().padStart(3, '0'));

            var nextBirthdayNumber = parseInt(age.year) + 1;
            $("#birthday-number").html(nextBirthdayNumber);
            var suffix = getOrdinalSuffix(nextBirthdayNumber);
            $("#date-suffix").html(suffix);
        }, 30);
    };

    function renderChoose()
    {
        $("#choose").css("display", "block");
    };

    function getAge(dob){
        var now       = new Date;
        var duration  = now - dob;
        var years     = duration / 31556900000;
        
        var majorMinor = years.toFixed(9).toString().split('.');
        
        return {
            "year": majorMinor[0],
            "ms": majorMinor[1]
        };
    };

    function getCountdown(dob) {
        var now = new Date();
        var nextBirthday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
    
        if (now > nextBirthday) {
            nextBirthday.setFullYear(now.getFullYear() + 1);
        }
    
        var duration = nextBirthday - now;
    
        var months = Math.floor(duration / (1000 * 60 * 60 * 24 * 30));
        duration -= months * (1000 * 60 * 60 * 24 * 30);
    
        var days = Math.floor(duration / (1000 * 60 * 60 * 24));
        duration -= days * (1000 * 60 * 60 * 24);
    
        var hours = Math.floor(duration / (1000 * 60 * 60));
        duration -= hours * (1000 * 60 * 60);
    
        var minutes = Math.floor(duration / (1000 * 60));
        duration -= minutes * (1000 * 60);
    
        var seconds = Math.floor(duration / 1000);
        var milliseconds = duration % 1000;
    
        return {
            "months": months,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds,
            "milliseconds": milliseconds
        };
    };

    function getOrdinalSuffix(number) {
        if (number % 100 >= 11 && number % 100 <= 13) {
            return 'th';
        }
        switch (number % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    function main() {
        if (load() != -1)
        {
            renderAgeLoop();
        } else {
            renderChoose();
        }
    };
    main();
});